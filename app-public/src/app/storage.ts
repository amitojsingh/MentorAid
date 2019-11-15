import {InjectionToken} from '@angular/core';
export const BROWSER_STORAGE = new InjectionToken<Storage>
('Browser_Storage', {
    providedIn: 'root',
    factory: () => localStorage
});
