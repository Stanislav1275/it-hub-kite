import { useRQValue } from '@/shared/lib/query/useRQValue';

export const useSettings = useRQValue<boolean>({ key: 'settingsOpen', defaultValue: false });
