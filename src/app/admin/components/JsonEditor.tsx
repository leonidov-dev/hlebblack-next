'use client';

import { useState, useEffect } from 'react';

interface JsonEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helpText?: string;
  disabled?: boolean;
}

export default function JsonEditor({ 
  label, 
  value, 
  onChange, 
  placeholder = '[]', 
  helpText,
  disabled = false 
}: JsonEditorProps) {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const parsed = JSON.parse(value || '[]');
      setItems(Array.isArray(parsed) ? parsed : [parsed]);
      setError(null);
    } catch {
      setError('Неверный формат JSON');
      setItems([]);
    }
  }, [value]);

  const updateJson = (newItems: any[]) => {
    try {
      onChange(JSON.stringify(newItems, null, 2));
      setError(null);
    } catch (e) {
      setError('Ошибка при сохранении');
    }
  };

  const addItem = () => {
    const newItems = [...items, {}];
    setItems(newItems);
    updateJson(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    updateJson(newItems);
  };

  // Факты
  if (label.includes('Характеристики')) {
    return (
      <div className="field">
        <label>{label}</label>
        <div className="facts-editor">
          {items.map((fact, index) => (
            <div key={index} className="fact-item">
              <input
                type="text"
                value={fact}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index] = e.target.value;
                  setItems(newItems);
                  updateJson(newItems);
                }}
                placeholder="Например: 100% натуральный"
                disabled={disabled}
              />
              <button 
                onClick={() => removeItem(index)} 
                className="btn-remove-small"
                disabled={disabled}
                type="button"
              >
                ✕
              </button>
            </div>
          ))}
          <button 
            onClick={addItem} 
            className="btn-add-item"
            disabled={disabled}
            type="button"
          >
            + Добавить характеристику
          </button>
          {helpText && <small className="help-text">{helpText}</small>}
        </div>
      </div>
    );
  }

  // Дополнительная информация
  if (label.includes('Дополнительная')) {
    return (
      <div className="field">
        <label>{label}</label>
        <div className="facts-editor">
          {items.map((item, index) => (
            <div key={index} className="fact-item">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index] = e.target.value;
                  setItems(newItems);
                  updateJson(newItems);
                }}
                placeholder="Например: Срок хранения: 5 суток"
                disabled={disabled}
              />
              <button 
                onClick={() => removeItem(index)} 
                className="btn-remove-small"
                disabled={disabled}
                type="button"
              >
                ✕
              </button>
            </div>
          ))}
          <button 
            onClick={addItem} 
            className="btn-add-item"
            disabled={disabled}
            type="button"
          >
            + Добавить пункт
          </button>
          {helpText && <small className="help-text">{helpText}</small>}
        </div>
      </div>
    );
  }

  // Таблицы
  if (label.includes('Таблицы')) {
    return (
      <div className="field">
        <label>{label}</label>
        <div className="tables-editor">
          {items.map((table, index) => (
            <div key={index} className="table-editor-item">
              <div className="table-editor-header">
                <input
                  type="text"
                  value={table.caption || ''}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index] = { ...newItems[index], caption: e.target.value };
                    setItems(newItems);
                    updateJson(newItems);
                  }}
                  placeholder="Название таблицы"
                  className="table-caption-input"
                  disabled={disabled}
                />
                <button 
                  onClick={() => removeItem(index)} 
                  className="btn-remove"
                  disabled={disabled}
                  type="button"
                >
                  ✕
                </button>
              </div>
              <div className="table-rows">
                {Object.entries(table.items || {}).map(([key, val]) => (
                  <div key={key} className="table-row">
                    <input
                      type="text"
                      value={key}
                      onChange={(e) => {
                        const newItems = [...items];
                        const oldKey = key;
                        const itemsObj = { ...newItems[index].items };
                        if (e.target.value) {
                          itemsObj[e.target.value] = itemsObj[oldKey];
                          delete itemsObj[oldKey];
                        }
                        newItems[index] = { ...newItems[index], items: itemsObj };
                        setItems(newItems);
                        updateJson(newItems);
                      }}
                      placeholder="Название"
                      className="table-key-input"
                      disabled={disabled}
                    />
                    <input
                      type="text"
                      value={String(val)}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index] = { 
                          ...newItems[index], 
                          items: { ...newItems[index].items, [key]: e.target.value }
                        };
                        setItems(newItems);
                        updateJson(newItems);
                      }}
                      placeholder="Значение"
                      className="table-value-input"
                      disabled={disabled}
                    />
                    <button 
                      onClick={() => {
                        const newItems = [...items];
                        const currentItems = { ...newItems[index].items };
                        delete currentItems[key];
                        newItems[index] = { ...newItems[index], items: currentItems };
                        setItems(newItems);
                        updateJson(newItems);
                      }} 
                      className="btn-remove-small"
                      disabled={disabled}
                      type="button"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => {
                  const newItems = [...items];
                  const currentItems = newItems[index].items || {};
                  newItems[index] = { 
                    ...newItems[index], 
                    items: { ...currentItems, 'Новый параметр': '' }
                  };
                  setItems(newItems);
                  updateJson(newItems);
                }} 
                className="btn-add-item"
                disabled={disabled}
                type="button"
              >
                + Добавить строку
              </button>
            </div>
          ))}
          <button 
            onClick={addItem} 
            className="btn-add-item"
            disabled={disabled}
            type="button"
          >
            + Добавить таблицу
          </button>
          {helpText && <small className="help-text">{helpText}</small>}
        </div>
      </div>
    );
  }

  // Варианты
  if (label.includes('Варианты')) {
    return (
      <div className="field">
        <label>{label}</label>
        <div className="variants-editor">
          {items.map((variant, index) => (
            <div key={index} className="variant-item">
              <div className="variant-fields">
                <input
                  type="text"
                  value={variant.name || ''}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index] = { ...newItems[index], name: e.target.value };
                    setItems(newItems);
                    updateJson(newItems);
                  }}
                  placeholder="Название варианта"
                  className="variant-name"
                  disabled={disabled}
                />
                <input
                  type="text"
                  value={variant.weight || ''}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index] = { ...newItems[index], weight: e.target.value };
                    setItems(newItems);
                    updateJson(newItems);
                  }}
                  placeholder="Вес/объем"
                  className="variant-weight"
                  disabled={disabled}
                />
                <input
                  type="text"
                  value={variant.image || ''}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index] = { ...newItems[index], image: e.target.value };
                    setItems(newItems);
                    updateJson(newItems);
                  }}
                  placeholder="/images/файл.png"
                  className="variant-image"
                  disabled={disabled}
                />
                <button 
                  onClick={() => removeItem(index)} 
                  className="btn-remove-small"
                  disabled={disabled}
                  type="button"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
          <button 
            onClick={addItem} 
            className="btn-add-item"
            disabled={disabled}
            type="button"
          >
            + Добавить вариант
          </button>
          {helpText && <small className="help-text">{helpText}</small>}
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="field">
      <label>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="json-textarea"
        rows={5}
        disabled={disabled}
      />
      {helpText && <small className="help-text">{helpText}</small>}
    </div>
  );
}