import { trigger, state, style, transition, animate } from "@angular/animations";

export function setupAnimation() {
  return trigger('detailExpand', [
    state(
      'collapsed',
      style({ height: '0px', minHeight: '0', border: 'none' })
    ),
    state('expanded', style({ height: '*', borderBottomWidth: '1px' })),
    transition(
      'expanded <=> collapsed',
      animate('320ms cubic-bezier(0.4, 0.0, 0.2, 1)')
    ),
  ]);
}
