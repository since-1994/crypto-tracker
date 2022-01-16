## Recoil

### atoms.ts
```typescript
import { atom } from 'recoil'

export const isDarkAtom = atom({
    key: 'isDark',
    default: false
})
```

### modifier

```typescript
import { useSetRecoilState } from 'recoil';
import { isDarkAtom } from 'atoms.ts';

...
const setIsDark = useSetRecoilState(isDarkAtom);
const toggleDarkMode = setIsDark(prev => !prev);
...
```

### value 사용

```typescript
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from 'atoms.ts';

...
const isDark = useRecoilValue(isDarkAtom);
...
```