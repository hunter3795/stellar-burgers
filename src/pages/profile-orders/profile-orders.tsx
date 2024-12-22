import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchGetOrders,
  selectIsLoading,
  selectOrders
} from '../../services/slices/orders';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetOrders());
  }, [dispatch]);
  const orders: TOrder[] = useSelector(selectOrders);

  const isLoading = useSelector(selectIsLoading);
  if (isLoading) {
    return <Preloader />;
  }
  return <ProfileOrdersUI orders={orders} />;
};
