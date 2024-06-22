type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

const CommentOptions = ({ onEdit, onDelete }: Props) => {
  return (
    <div className="flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <button className="text-sm" onClick={onEdit}>
        Edit
      </button>
      <button className="text-sm text-danger-400" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default CommentOptions;
