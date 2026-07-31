import { useRef, useCallback } from 'react';

const InfiniteScroll = ({ children, hasMore, loadMore, loading }) => {
  const observerRef = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      
      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  return (
    <div>
      {children}
      {hasMore && (
        <div ref={lastElementRef} className="h-10 flex items-center justify-center">
          {loading && (
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-4 h-4 border-2 border-highlight border-t-transparent rounded-full animate-spin"></div>
              <span>Loading more...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;