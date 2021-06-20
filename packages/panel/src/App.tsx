import React, { useState } from 'react';

import { Button } from '@coderscamp/ui/components/Button';

import { useUsers } from '@/hooks/useUsers';

export const App = () => {
  const [count, setCount] = useState(0);
  const users = useUsers();
  console.log(users);

  const handleClick = () => setCount((prev) => prev + 1);

  return <Button onClick={handleClick}>count is: {count}</Button>;
};
