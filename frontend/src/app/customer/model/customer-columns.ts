import { Column } from '@app/shared/filter-table/models/column.model';

export const lossDetailColumns: Array<Column> = [
  { value: 'customer', triggerFor: [] },
  { value: 'name', triggerFor: [] },
  { value: 'business_no', triggerFor: [] },
  { value: 'owner', triggerFor: [] },
  { value: 'assignee', triggerFor: [] },
  { value: 'phone_no', triggerFor: [] },
  { value: 'fax_no', triggerFor: [] },
  { value: 'address', triggerFor: [] },
  { value: 'notes', triggerFor: [] },
  { value: 'business_type', triggerFor: [] },
  { value: 'business_type_detail', triggerFor: [] },
  { value: 'business_type_2', triggerFor: [] },
  { value: 'business_type_2_detail', triggerFor: [] },
  { value: 'credit_limit', triggerFor: [] },
];
