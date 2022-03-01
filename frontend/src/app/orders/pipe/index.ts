import { OrderUnitValuePipe } from './order-unit-value.pipe';
import { OrdersPipe } from './orders.pipe';
import { CountPrice } from './price.pipe';
import { SkuPipe } from './sku.pipe';

export const pipes = [OrdersPipe, CountPrice, SkuPipe, OrderUnitValuePipe];
