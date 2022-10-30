/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchCategory } from '../../Apis/categoryApi';
import AppContext from '../../Context/useContext';
import { CategoryAll } from '../../Interface/Category';
import { Tokens } from '../../Interface/Token';
import { TransactionPassing } from '../../Interface/Transaction';
import { ActionType } from '../../Redux/ActionTypes';
import Resister from './Resister';
import ErrorPop from '../ErrorPop';

import CategorySetting from './Setting';
import { UserInfo } from '../../Interface/UserInfo';

const EditTransaction = () => {
  const { userStatus, dispatchUserState } = useContext(AppContext);
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();
  const { state } = useLocation();
  const { transaction } = state
    ? (state as TransactionPassing)
    : { transaction: null };

  useEffect(() => {
    // TODO: exclude token expire pattern because it's right after login
    const getCategory = async () => {
      const data = await fetchCategory(userStatus.tokens!);
      if (Object.prototype.hasOwnProperty.call(data, 'income')) {
        const allCate = data as CategoryAll;
        dispatchUserState({
          type: ActionType.ADD_INCOME_CATEGORY,
          newCategory: allCate.income,
        });
        dispatchUserState({
          type: ActionType.ADD_EXPENSE_CATEGORY,
          newCategory: allCate.expense,
        });
      } else if (Object.prototype.hasOwnProperty.call(data, 'refresh')) {
        const token = data as Tokens;
        dispatchUserState({
          type: ActionType.LOGIN_USER,
          token,
          email: userStatus.email,
        });
      }
    };

    if (userStatus.loggedIn === false) {
      const localData = localStorage.getItem('userInfo');
      if (!localData) {
        nav('/login');
      } else {
        const userInfo: UserInfo = JSON.parse(localData) as UserInfo;
        // TODO use refresh token to get new token
        dispatchUserState({
          type: ActionType.LOGIN_USER,
          token: userInfo.tokens,
          email: userInfo.email,
        });
      }
    } else {
      getCategory().catch(console.error);
    }
  }, [userStatus.loggedIn]);

  return (
    <>
      <div className="flex justify-center">
      {error && <ErrorPop message={error} setError={setError} />}
      </div>
      <div
        className="flex justify-between max-w-272 mx-auto pt-10"
        style={{ marginTop: '60px' }}
      >
        <section className="w-1/2">
          <h3 className="text-3xl">Edit Transaction</h3>
          <Resister transaction={transaction} setError={setError} />
          <button
            type="button"
            onClick={() => nav('/')}
            className="block w-36 mx-auto p-2 bg-white border-2 border-black text-black rounded-full hover:bg-black hover:text-white duration-200 active:translate-y-1"
          >
            Back to Home
          </button>
        </section>
        <CategorySetting setError={setError}/>
      </div>
    </>
  );
};

export default EditTransaction;
