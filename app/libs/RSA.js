'use strict';
const crypto = require('crypto');

/**
 * 生成RSA公私钥对
 * @return {*} 秘钥对
 */
function generateRSAKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
      // cipher: 'aes-256-cbc',
      // passphrase: Buffer.from(Date.now().toString()),
    },
  });

  return { publicKey, privateKey };
}

/**
 * 使用私钥进行解密
 * @param {String} privateKey - 私钥
 * @param {String} encryptedData - 密文
 * @return {String} 解密后的明文
 */
function privateKeyDecrypt(privateKey, encryptedData) {
  return crypto.privateDecrypt(privateKey, Buffer.from(encryptedData, 'base64')).toString();
}

/**
 * 使用公钥进行加密
 * @param {String} publicKey - 公钥
 * @param {String} data - 要加密的数据
 * @return {String} 加密后的密文
 */
function publicKeyEncrypt(publicKey, data) {
  return crypto.publicEncrypt(publicKey, Buffer.from(data)).toString('base64');
}

module.exports = {
  generateRSAKeyPair,
  privateKeyDecrypt,
  publicKeyEncrypt,
};
