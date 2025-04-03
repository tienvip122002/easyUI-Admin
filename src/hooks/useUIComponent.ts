import { useState, useCallback } from 'react';
import { UIComponent, CreateUIComponentDto } from '../models/uicomponent';
import { UIComponentService } from '../services/uicomponent.service';
import { message } from 'antd';

export const useUIComponent = () => {
  const [loading, setLoading] = useState(false);
  const [components, setComponents] = useState<UIComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<UIComponent | null>(null);

  const fetchComponents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await UIComponentService.getAll();
      setComponents(data);
    } catch (error) {
      message.error('Failed to fetch components');
    } finally {
      setLoading(false);
    }
  }, []);

  const createComponent = useCallback(async (data: CreateUIComponentDto) => {
    try {
      setLoading(true);
      await UIComponentService.create(data);
      message.success('Component created successfully');
      await fetchComponents();
    } catch (error) {
      message.error('Failed to create component');
    } finally {
      setLoading(false);
    }
  }, [fetchComponents]);

  return {
    loading,
    components,
    selectedComponent,
    setSelectedComponent,
    fetchComponents,
    createComponent
  };
}; 