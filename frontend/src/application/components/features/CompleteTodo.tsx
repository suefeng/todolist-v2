import React from 'react';

import { Todo } from 'domain/entities/Todo';
import { Checkbox } from 'application/components/Checkbox';

export const CompleteTodo = ({
  todo,
  onChange,
}: {
  todo: Todo;
  onChange: Function;
}) => {
  return (
    <Checkbox
      id={todo.description}
      className="hidden"
      onChange={(event) => onChange(event, todo)}
      checked={todo.status === 'completed'}
    />
  );
};
