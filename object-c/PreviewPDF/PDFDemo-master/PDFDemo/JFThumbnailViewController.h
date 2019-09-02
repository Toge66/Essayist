//
//  JFThumbnailViewController.h
//  PDFDemo
//
//  Created by taochang on 2018/11/12.
//  Copyright © 2018 taochang. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <PDFKit/PDFKit.h>

NS_ASSUME_NONNULL_BEGIN

@class JFThumbnailViewController;

@protocol JFThumbnailViewControllerDelegate <NSObject>


/**
 缩略图被点击

 @param controller 缩略图controller
 @param indexPath indexPath
 */
- (void)thumbnailViewController:(JFThumbnailViewController *)controller didSelectAtIndex:(NSIndexPath *)indexPath;

@end

@interface JFThumbnailViewController : UIViewController

@property (nonatomic, strong) PDFDocument *pdfDocument;
@property (nonatomic, weak) id<JFThumbnailViewControllerDelegate> delegate;

@end

NS_ASSUME_NONNULL_END
