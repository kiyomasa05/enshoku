type FormDataKeyValue = {
  [key: string]: string | string[] | FormDataKeyValue;
};

export function convertFormDataToObject<T>(formData: FormData): T {
  const obj: FormDataKeyValue = {};

  // FormDataのエントリーを平坦なオブジェクトに変換
  for (const [key, value] of formData.entries()) {
    if (key.includes('[') && key.includes(']')) {
      // ネストされたキーの処理（例：projectList[0].doneContents[0]）
      const keys = key.split(/[\[\].]+/).filter(k => k !== '');
      let current = obj;
      
      keys.forEach((k, i) => {
        if (i === keys.length - 1) {
          current[k] = value as string;
        } else {
          current[k] = current[k] || {};
          current = current[k] as FormDataKeyValue;
        }
      });
    } else {
      obj[key] = value as string;
    }
  }

  // 配列の処理
  const processArrays = (obj: any): any => {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        obj[key] = processArrays(obj[key]);
        
        // 数値のキーを持つオブジェクトを配列に変換
        if (Object.keys(obj[key]).every(k => !isNaN(Number(k)))) {
          obj[key] = Object.values(obj[key]);
        }
      }
    }
    return obj;
  };

  return processArrays(obj) as T;
} 
