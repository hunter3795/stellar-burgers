import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds, selectFeeds } from '../../services/slices/feeds';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectFeeds);
  const dispatch = useDispatch();

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeeds);
      }}
    />
  );
};
