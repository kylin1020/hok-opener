import QRCode from 'qrcode'

export async function generateQRCodeBase64(text: string): Promise<string> {
  try {
    const qrCodeBase64 = await QRCode.toDataURL(text, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })
    return qrCodeBase64
  } catch (err) {
    console.error('QR Code generation error:', err)
    throw err
  }
}
