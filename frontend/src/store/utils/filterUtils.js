export const useFilterLogic = (initialFilterState) => {
    const [filterExpression, setFilterExpression] = useState(initialFilterState);
    
    return [filterExpression, setFilterExpression];
  };