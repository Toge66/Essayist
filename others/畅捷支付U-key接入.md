# 畅捷支付U-key接入
## windows
### 干什么用的?
用来验证当前操作人是授权用户，后端发起支付的流水号需要使用U-key加签，`操作员号(SubjectCN)`+`流水号` 使用U-key对拼接的字符串加签后连同`操作员号`一并再传给后端，后端使用加签后的信息发起支付

### 使用
* 插入Ukey运行autorun.exe，安装用友管理工具
* 下载浏览器对应驱动：[IE-x86](http://video.ekuaibao.com/driver/chanpay/x86.zip)、[IE-x64](http://video.ekuaibao.com/driver/chanpay/x64.zip)、[其它](http://video.ekuaibao.com/driver/chanpay/npCryptokit.zip)，目前chrome浏览器不支持
* api接入
 
 ```
 try {
    const eDiv = document.createElement('div')
    eDiv.style.height = 0
    if (navigator.appName.indexOf('Internet') >= 0 || navigator.appVersion.indexOf('Trident') >= 0) {
      if (window.navigator.cpuClass == 'x86') {
        eDiv.innerHTML =
          '<object id="CryptoAgent" codebase="CryptoKit.Ultimate.x86.cab" classid="clsid:4C588282-7792-4E16-93CB-9744402E4E98" ></object>'
      } else {
        eDiv.innerHTML =
          '<object id="CryptoAgent" codebase="CryptoKit.Ultimate.x64.cab" classid="clsid:B2F2D4D4-D808-43B3-B355-B671C0DE15D4" ></object>'
      }
    } else {
      eDiv.innerHTML =
        '<embed id="CryptoAgent" type="application/npCryptoKit.Ultimate.x86" style="height: 0px; width: 0px">'
    }
    document.body.appendChild(eDiv)
  } catch (e) {
    console.log(e)
  }
  CryptoAgent = document.getElementById('CryptoAgent')
```

* api使用：[api文档](https://github.com/Toge66/Essayist/blob/master/others/demo/%E7%95%85%E6%8D%B7Ukey/%E6%96%87%E6%A1%A3/CFCA%20%E8%AF%81%E4%B9%A6%E5%B7%A5%E5%85%B7%E5%8C%85(Ultimate%E7%89%88)%E6%8E%A5%E5%8F%A3%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C.pdf)

```
例：获取U-key中证书主题操作员号
try {
	/*
	 infotypeId:
	 "SubjectDN"           //证书主题 DN
	 "SubjectCN"           //证书主题 CN
	 "IssuerDN"            //颁发者 DN
	 "SerialNumber"        //证书序列号
	 "CSPName"             //证书对应的 CSP 名称
	 "CertType"            //证书类型;SM2 或 RSA
	 * */
    const infoContent = CryptoAgent.GetSignCertInfo("SubjectCN");
    if (!InfoContent) {
	var errorDesc = CryptoAgent.GetLastErrorDesc();
	alert(errorDesc);
	return;
    }
    return infoContent
} catch (e) {
    var errorDesc = CryptoAgent.GetLastErrorDesc();
    alert(errorDesc);
}
```

* [demo](https://github.com/Toge66/Essayist/tree/master/others/demo/%E7%95%85%E6%8D%B7Ukey/Demo)

## Mac
### 需要定制U-key目前还没有提供
