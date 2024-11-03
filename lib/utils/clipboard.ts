/**
 * 通用的复制到剪贴板函数
 * @param text 要复制的文本
 * @returns Promise<boolean> 是否复制成功
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // 优先使用 navigator.clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('使用 navigator.clipboard 复制失败:', err);
    }
  }

  // 降级方案：使用 textarea 元素
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    
    // 防止滚动
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.opacity = '0';
    
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    
    // 执行复制命令
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    return true;
  } catch (err) {
    console.error('使用 execCommand 复制失败:', err);
    return false;
  }
} 