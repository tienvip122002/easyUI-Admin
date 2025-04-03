import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Card, Tabs, Spin } from 'antd';
import { UIComponent } from '../../models/uicomponent';
import { UIComponentService } from '../../services/uicomponent.service';
import { useParams } from 'react-router-dom';

const { TabPane } = Tabs;

const Editor = lazy(() => import('@monaco-editor/react'));

const ComponentView: React.FC = () => {
  const { id } = useParams();
  const [component, setComponent] = useState<UIComponent | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComponent = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await UIComponentService.getById(id);
        setComponent(data);
      } catch (error) {
        console.error('Failed to fetch component:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComponent();
  }, [id]);

  if (loading) return <Spin />;
  if (!component) return null;

  return (
    <Card title={component.name}>
      <Tabs defaultActiveKey="preview">
        <TabPane tab="Preview" key="preview">
          <iframe
            srcDoc={`
              <html>
                <style>${component.css || ''}</style>
                <body>
                  ${component.html || ''}
                  <script>${component.js || ''}</script>
                </body>
              </html>
            `}
            style={{ width: '100%', height: '500px', border: 'none' }}
          />
        </TabPane>
        <TabPane tab="HTML" key="html">
          <Suspense fallback={<Spin />}>
            <Editor
              height="400px"
              defaultLanguage="html"
              value={component.html || ''}
              options={{ readOnly: true }}
            />
          </Suspense>
        </TabPane>
        <TabPane tab="CSS" key="css">
          <Editor
            height="400px"
            defaultLanguage="css"
            value={component.css || ''}
            options={{ readOnly: true }}
          />
        </TabPane>
        <TabPane tab="JavaScript" key="js">
          <Editor
            height="400px"
            defaultLanguage="javascript"
            value={component.js || ''}
            options={{ readOnly: true }}
          />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default ComponentView; 