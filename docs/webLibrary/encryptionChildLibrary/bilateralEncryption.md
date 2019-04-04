# 前后端通信加密 
---

### 1.AES
AES高级加密标准，是一中最常见的加密算法。加密和解密使用相同的密钥。

### 2.RSA
RSA是一种非对称加密，非对称加密算法需要两个密钥，即公开密钥和私有密钥。公钥加密的用私钥解密，私钥加密的用公钥解密。

### 3.加解密过程
* 服务端生成并保持AES对称加密密钥sAesKey。
* 服务端使用RSA生成一对随机的密钥对。服务端保存私钥sPrivateRsaKey,公钥sPublicRsaKey传给客户端。
* 客户端使用RSA生成一对随机的密钥对。客户端保存私钥cPrivateRsaKey,使用sPublicRsaKey加密生成的公钥cPublicRsaKey。
* 服务端使用保存的sPrivateRsaKey解密，得到客户端生成的公钥cPublicRsaKey。
* 服务端使用cPublicRsaKey加密之前生成的AES密钥sAesKey传给客户端。
* 客户端使用之前自己生成并保存的客户端私钥cPrivateRsaKey解密使用cPublicRsaKey加密的sAesKey，这时客户端和服务端具有相同的sAesKey。
* 客户端和服务端使用sAesKey加密需要传输的数据，使用sAesKey解密接收到的密文。
