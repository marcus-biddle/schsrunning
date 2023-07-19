import { ReactNode, useState } from "react";

interface Props<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
}

const GenericList = <T,>({ items, renderItem }: Props<T>) => {
  const [state, setState] = useState<T[]>(items);

  const handleDuplicate = () => {
    setState((prevItems) => [...prevItems, ...prevItems]);
  };

  return (
    <div>
      {state.map(renderItem)}
      <button onClick={handleDuplicate}>Duplicate</button>
    </div>
  );
};

export default GenericList;

