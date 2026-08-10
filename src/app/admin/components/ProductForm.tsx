'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import JsonEditor from './JsonEditor';
import { createProduct, updateProduct } from '../actions';

interface ProductFormProps {
  initialData?: any;
  categories: any[];
  isEditing?: boolean;
}

export default function ProductForm({ initialData, categories, isEditing = false }: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    categoryId: initialData?.categoryId || '',
    image: initialData?.image || '',
    description: initialData?.description || '',
    price: initialData?.price || '',
    sortOrder: initialData?.sortOrder || 0,
    active: initialData?.active ?? true,
    facts: JSON.stringify(initialData?.facts || [], null, 2),
    tables: JSON.stringify(initialData?.tables || [], null, 2),
    additional: JSON.stringify(initialData?.additional || [], null, 2),
    variants: JSON.stringify(initialData?.variants || [], null, 2),
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formDataToSend = new FormData(form);
    
    // Добавляем JSON-поля из состояния
    formDataToSend.set('facts', formData.facts);
    formDataToSend.set('tables', formData.tables);
    formDataToSend.set('additional', formData.additional);
    formDataToSend.set('variants', formData.variants);
    formDataToSend.set('active', formData.active ? 'on' : '');

    startTransition(async () => {
      try {
        if (isEditing && initialData) {
          await updateProduct(initialData.id, formDataToSend);
        } else {
          await createProduct(formDataToSend);
        }
      } catch (err: any) {
        setError(err.message || 'Ошибка при сохранении');
      }
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && (
        <div className="error-message" style={{ 
          background: '#fee', 
          padding: '12px 16px', 
          borderRadius: '8px', 
          color: '#c44',
          border: '1px solid #fcc'
        }}>
          ❌ {error}
        </div>
      )}

      <div className="row">
        <div className="field">
          <label>Название товара *</label>
          <input 
            name="name" 
            required 
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            disabled={isPending}
          />
        </div>
        <div className="field">
          <label>Категория *</label>
          <select 
            name="categoryId" 
            required
            value={formData.categoryId}
            onChange={(e) => handleChange('categoryId', e.target.value)}
            disabled={isPending}
          >
            <option value="">Выберите категорию</option>
            {categories.map(c => (
              <option value={c.id} key={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label>Изображение</label>
        <input 
          name="image" 
          placeholder="/images/имя-файла.png"
          value={formData.image}
          onChange={(e) => handleChange('image', e.target.value)}
          disabled={isPending}
        />
        {formData.image && (
          <div className="image-preview">
            <img src={formData.image} alt="Превью" />
          </div>
        )}
      </div>

      <div className="field">
        <label>Описание</label>
        <textarea 
          name="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
          disabled={isPending}
        />
      </div>

      <div className="row">
        <div className="field">
          <label>Цена</label>
          <input 
            name="price" 
            placeholder="0"
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
            disabled={isPending}
          />
        </div>
        <div className="field">
          <label>Порядок сортировки</label>
<input 
  name="sortOrder" 
  type="number" 
  value={formData.sortOrder}
  onChange={(e) => handleChange('sortOrder', parseInt(e.target.value) || 0)}
  disabled={isPending}
/>
        </div>
      </div>

      <div className="field">
        <label>
          <input 
            type="checkbox" 
            name="active" 
            checked={formData.active}
            onChange={(e) => handleChange('active', e.target.checked)}
            disabled={isPending}
          /> 
          Опубликован
        </label>
      </div>

      <JsonEditor
        label="Характеристики — добавьте по одному"
        value={formData.facts}
        onChange={(val) => handleChange('facts', val)}
        helpText="Каждая характеристика будет отображаться как отдельный пункт"
        disabled={isPending}
      />

      <JsonEditor
        label="Таблицы — пищевая ценность"
        value={formData.tables}
        onChange={(val) => handleChange('tables', val)}
        helpText="Добавьте таблицы с данными: название + строки"
        disabled={isPending}
      />

      <JsonEditor
        label="Дополнительная информация"
        value={formData.additional}
        onChange={(val) => handleChange('additional', val)}
        helpText="Например: «Срок хранения: 5 суток»"
        disabled={isPending}
      />

      <JsonEditor
        label="Варианты товара"
        value={formData.variants}
        onChange={(val) => handleChange('variants', val)}
        helpText="Разные варианты одного товара (упаковка, вес, изображение)"
        disabled={isPending}
      />

      <button className="btn" type="submit" disabled={isPending}>
        {isPending ? '⏳ Сохранение...' : isEditing ? '💾 Сохранить изменения' : '➕ Сохранить товар'}
      </button>
      
      <button 
        type="button" 
        className="btn light" 
        onClick={() => router.push('/admin')}
        disabled={isPending}
      >
        Отмена
      </button>
    </form>
  );
}