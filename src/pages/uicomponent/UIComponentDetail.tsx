import CommentList from '../../components/comment/CommentList';

const UIComponentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      {/* Existing UIComponent detail content */}
      
      {/* Add CommentList component */}
      {id && <CommentList componentId={id} />}
    </div>
  );
}; 