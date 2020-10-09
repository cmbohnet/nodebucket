/**
 * Title: employee.interface.ts
 * Author: Chris Bohnet
 * Date: 08 October 2020
 * Description: employee.interface module
 * Modifications:
 */
import {Item } from './item.interface';

export interface Employee
{
  empId: string,
  todo: Item[],
  done: Item[]

}
