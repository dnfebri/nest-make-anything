import { FindOptionsWhere, FindOptionsOrder, FindOptionsSelect } from 'typeorm';

export type EntityCondition<T> = FindOptionsWhere<T>;
export type EntityConditionOrder<T> = FindOptionsOrder<T>;
export type EntityConditionSelect<T> = FindOptionsSelect<T>;
