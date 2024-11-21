import QRCode from 'qrcode'
import fs from 'fs'
import path from 'path'

export async function generateQRCodeImage(data: string, roomId: string): Promise<string> {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  
  const publicDir = path.join(process.cwd(), 'public')
  const qrBaseDir = path.join(publicDir, 'qr')
  const yearDir = path.join(qrBaseDir, year.toString())
  const monthDir = path.join(yearDir, month)
  const dayDir = path.join(monthDir, day)
  
  // 递归创建目录结构
  const dirs = [qrBaseDir, yearDir, monthDir, dayDir]
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  }
  
  const fileName = `${roomId}.png`
  const filePath = path.join(dayDir, fileName)
  
  // 生成 QR 码并保存为 PNG 文件
  await QRCode.toFile(filePath, data, {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: 300
  })
  
  // 返回相对路径用于 <img> 标签
  return `/qr/${year}/${month}/${day}/${fileName}`
}
