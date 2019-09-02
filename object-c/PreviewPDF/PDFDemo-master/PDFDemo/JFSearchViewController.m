//
//  JFSearchViewController.m
//  PDFDemo
//
//  Created by Japho on 2018/11/14.
//  Copyright © 2018 Japho. All rights reserved.
//

#import "JFSearchViewController.h"
#import "JFSeachCell.h"

NSString * const searchViewControllerTableViewCellID = @"searchViewControllerTableViewCellID";

@interface JFSearchViewController () <UISearchBarDelegate,UITableViewDelegate,UITableViewDataSource,PDFDocumentDelegate>

@property (nonatomic, strong) UISearchBar *searchBar;
@property (nonatomic, strong) UITableView *tableView;
@property (nonatomic, strong) NSMutableArray *arrData;
@property (nonatomic, strong) NSMutableArray *docArray;

@end

@implementation JFSearchViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    self.navigationItem.titleView = self.searchBar;
    self.view.backgroundColor = [UIColor whiteColor];
    [self.view addSubview:self.tableView];
//    [self loadData];
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    
    [self.searchBar becomeFirstResponder];
}

- (void)cancleAction
{
    [self dismissViewControllerAnimated:YES completion:nil];
}

- (void)loadData{
    
    NSLog(@"%ld",self.pdfDocment.pageCount);
    self.docArray = [NSMutableArray array];
    
    //几个f组
    NSInteger section = self.pdfDocment.pageCount / 100;
    section = self.pdfDocment.pageCount / 100 == 0?section:section+1;
    
    int start = 0;
    for (int i = 0; i<section; i++) {

        NSMutableData *dataSection = [NSMutableData data];
        int left = (self.pdfDocment.pageCount-1) % 100;

        //一组多少页
        int jall;
        int index;
        if (i == section -1) {
            index = left;
            jall = (int)(self.pdfDocment.pageCount-1);
        }else{
            index = 100;
            jall = (i+1)*100-1;
        }

        //分页计算
        for (int j = start; j<jall; j++) {
            PDFPage *page = [self.pdfDocment pageAtIndex:i];
            NSData *data = page.dataRepresentation;
            [dataSection appendData:data];
//            PDFDocument *doc = [[PDFDocument alloc]initWithData:dataSection];
            
            if (j == jall -1) {
                PDFDocument *doc = [[PDFDocument alloc]initWithData:dataSection];
                [self.docArray addObject:doc];
            }
        }
        start = jall+1;
    }

    //分好了5组
    
}
#pragma mark - --- UITableView DataSource ---

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return self.arrData.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    JFSeachCell *cell = [tableView dequeueReusableCellWithIdentifier:searchViewControllerTableViewCellID forIndexPath:indexPath];
    
    PDFSelection *selection = self.arrData[indexPath.row];
    PDFPage *page = selection.pages[0];
    PDFOutline *outline = [self.pdfDocment outlineItemForSelection:selection];
    
    NSString *destinationStr = [NSString stringWithFormat:@"%@  PAGE: %@", outline.label, page.label];
    
    cell.lblDestination.text = destinationStr;
    
    PDFSelection *extendSelection = [selection copy];
    [extendSelection extendSelectionAtStart:10];
    [extendSelection extendSelectionAtEnd:90];
    [extendSelection extendSelectionForLineBoundaries];
    
    NSRange range = [extendSelection.string rangeOfString:selection.string options:NSCaseInsensitiveSearch];
    NSMutableAttributedString *attrStr = [[NSMutableAttributedString alloc] initWithString:extendSelection.string];
    [attrStr addAttribute:NSBackgroundColorAttributeName value:[UIColor yellowColor] range:range];
    
    cell.lblResult.attributedText = attrStr;
    
    return cell;
}

#pragma mark - --- UITableView Delegate ---

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSLog(@"%s",__func__);
    
    PDFSelection *selection = self.arrData[indexPath.row];
    
    if (self.delegate && [self.delegate respondsToSelector:@selector(searchViewController:didSelectSearchResult:)])
    {
        [self.delegate searchViewController:self didSelectSearchResult:selection];
    }
    
    [self cancleAction];
}

#pragma mark - --- UIScrollView Delegate ---

- (void)scrollViewWillBeginDragging:(UIScrollView *)scrollView
{
    [self.searchBar resignFirstResponder];
}

#pragma mark - --- UISearchBar Delegate ---

- (void)searchBarSearchButtonClicked:(UISearchBar *)searchBar
{
    [searchBar resignFirstResponder];
}

- (void)searchBarCancelButtonClicked:(UISearchBar *)searchBar
{
    [self.pdfDocment cancelFindString];
    [self cancleAction];
}

- (void)searchBar:(UISearchBar *)searchBar textDidChange:(NSString *)searchText
{
    
    [self.arrData removeAllObjects];
    [self.tableView reloadData];
    
    __weak typeof(self)weakself = self;
   
    if (searchText.length < 2)
    {
        return;
    }
    
    __weak typeof(self)weakSelf = self;
    dispatch_async(dispatch_get_global_queue(0, 0), ^{
        // 处理耗时操作的代码块...
        NSArray *result = [NSArray array];
        result = [self.pdfDocment findString:searchText withOptions:NSCaseInsensitiveSearch];
        [weakSelf.arrData addObjectsFromArray:result];
        
        //通知主线程刷新
        dispatch_async(dispatch_get_main_queue(), ^{
            //回调或者说是通知主线程刷新，
            [self.tableView reloadData];
        });
    });
}

- (void)searchSectionData:(NSString *)searchText{
    
    __weak typeof(self)weakSelf = self;
    
    for (PDFDocument *doc in self.docArray) {
        dispatch_async(dispatch_get_global_queue(0, 0), ^{
            // 处理耗时操作的代码块...
            NSArray *result = [NSArray array];
            result = [doc findString:searchText withOptions:NSCaseInsensitiveSearch];
            [weakSelf.arrData addObjectsFromArray:result];
            
            //通知主线程刷新
            dispatch_async(dispatch_get_main_queue(), ^{
                //回调或者说是通知主线程刷新，
                [self.tableView reloadData];
                 });
            });
    }
}

#pragma mark - --- PDFDocument Delegate ---

- (void)didMatchString:(PDFSelection *)instance
{
    __weak __typeof(self) weakself= self;
//    dispatch_queue_t globalQueue = dispatch_get_global_queue(0, 0);
//    dispatch_async(globalQueue, ^{
//    dispatch_async(dispatch_get_main_queue(), ^{
    
//        [self.arrData addObject:instance];

//        //回到主线程
//        dispatch_async(dispatch_get_main_queue(), ^{
//            [weakself.tableView reloadData];
//        });
//    });
//    });
    
}

#pragma mark - --- setter & getter ---

- (UISearchBar *)searchBar
{
    if (!_searchBar)
    {
        _searchBar = [[UISearchBar alloc] init];
        _searchBar.delegate = self;
        _searchBar.showsCancelButton = YES;
        _searchBar.searchBarStyle = UISearchBarStyleMinimal;
    }
    
    return _searchBar;
}

- (UITableView *)tableView
{
    if (!_tableView)
    {
        _tableView = [[UITableView alloc] initWithFrame:self.view.bounds style:UITableViewStylePlain];
        _tableView.delegate = self;
        _tableView.dataSource = self;
        [_tableView registerNib:[UINib nibWithNibName:@"JFSeachCell" bundle:nil] forCellReuseIdentifier:searchViewControllerTableViewCellID];
        _tableView.tableFooterView = [UIView new];
        _tableView.rowHeight = 150;
    }
    
    return _tableView;
}

- (NSMutableArray *)arrData
{
    if (!_arrData)
    {
        _arrData = [[NSMutableArray alloc] init];
    }
    
    return _arrData;
}

@end
