import { useState, useEffect } from 'react';
import { UIComponentService } from '../services/uicomponent.service';
import { UIComponent, UpdateUIComponentRequest } from '../models/uicomponent';
import { message } from 'antd';

export const useUIComponentEdit = (id: string) => {
  const [component, setComponent] = useState<UIComponent | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const fetchComponent = async () => {
    try {
      setLoading(true);
      const data = await UIComponentService.getById(id);
      console.log('Fetched component:', data); // Debug log
      setComponent(data);
    } catch (error) {
      console.error('Fetch error:', error);
      message.error('Failed to fetch component');
    } finally {
      setLoading(false);
    }
  };

  const updateComponent = async (data: UpdateUIComponentRequest) => {
    try {
      setUpdating(true);
      console.log('Updating component with data:', data); // Debug log
      const result = await UIComponentService.update(id, data);
      console.log('Update result:', result); // Debug log
      message.success('Component updated successfully');
      return true;
    } catch (error) {
      console.error('Update error:', error);
      message.error('Failed to update component');
      return false;
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchComponent();
    }
  }, [id]);

  return {
    component,
    loading,
    updating,
    updateComponent,
    fetchComponent
  };
}; 