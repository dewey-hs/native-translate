// Global type definitions for the extension

interface TranslatorStatic {
  create(options: {
    sourceLanguage: string
    targetLanguage: string
    monitor?: (m: EventTarget) => void
  }): Promise<TranslatorInstance>
}

interface TranslatorInstance {
  ready?: Promise<void>
  translate(text: string): Promise<string>
}

interface LanguageDetectorStatic {
  create(options: {
    monitor?: (m: EventTarget) => void
  }): Promise<LanguageDetectorInstance>
  availability(): Promise<string>
}

interface LanguageDetectorInstance {
  detect(text: string): Promise<LanguageDetectionResult[]>
}

interface LanguageDetectionResult {
  detectedLanguage: string
  confidence: number
}

interface ChromeStorage {
  session?: chrome.storage.StorageArea
  local: chrome.storage.StorageArea
}

declare global {
  interface Window {
    Translator?: TranslatorStatic
    LanguageDetector?: LanguageDetectorStatic
    __nativeTranslatePool?: Map<string, TranslatorInstance>
    __nativeLanguageDetector?: LanguageDetectorInstance
    __nativeTranslateHoverAltInit?: boolean
  }

  interface Chrome {
    storage: {
      session?: chrome.storage.StorageArea
    } & typeof chrome.storage
  }

  interface Window {
    chrome: Chrome
  }
}

export {}
