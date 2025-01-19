import { FC, useMemo, useState } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  selectConstructorItems
} from '../../services/slices/ingredients';
import {
  clearOrderNumberModalData,
  orderBurger,
  selectIsLoadingOrderRequst,
  selectOrderModalData
} from '../../services/slices/orders';
import { getUser } from '../../services/slices/user';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(selectConstructorItems);
  const user = useSelector(getUser);
  const orderRequest = useSelector(selectIsLoadingOrderRequst);
  const orderModalData = useSelector(selectOrderModalData);

  const onOrderClick = () => {
    if (!user) {
      navigate('/profile');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    const dataOrder = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(orderBurger(dataOrder));
  };
  const closeOrderModal = () => {
    dispatch(clearOrderNumberModalData());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
