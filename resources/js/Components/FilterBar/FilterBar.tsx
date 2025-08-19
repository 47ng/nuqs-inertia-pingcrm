import FieldGroup from '@/Components/Form/FieldGroup';
import SelectInput from '@/Components/Form/SelectInput';
import TextInput from '@/Components/Form/TextInput';
import { ChevronDown } from 'lucide-react';
import { debounce, parseAsString, useQueryStates } from 'nuqs';
import { useState } from 'react';

const searchParams = {
  search: parseAsString.withDefault(''),
  role: parseAsString.withDefault(''),
  trashed: parseAsString.withDefault('')
};

export default function FilterBar() {
  const [opened, setOpened] = useState(false);
  const [{ role, search, trashed }, setFilters] = useQueryStates(searchParams, {
    shallow: false
  });

  return (
    <div className="flex items-center w-full max-w-md mr-4">
      <div className="relative flex bg-white rounded shadow">
        <div
          style={{ top: '100%' }}
          className={`absolute ${opened ? '' : 'hidden'}`}
        >
          <div
            onClick={() => setOpened(false)}
            className="fixed inset-0 z-20 bg-black opacity-25"
          />
          <div className="relative z-30 w-64 px-4 py-6 mt-2 bg-white rounded shadow-lg space-y-4">
            {Boolean(role) && (
              <FieldGroup label="Role" name="role">
                <SelectInput
                  name="role"
                  value={role}
                  onChange={e =>
                    setFilters({ role: e.target.value }).then(() =>
                      setOpened(false)
                    )
                  }
                  options={[
                    { value: '', label: '' },
                    { value: 'user', label: 'User' },
                    { value: 'owner', label: 'Owner' }
                  ]}
                />
              </FieldGroup>
            )}
            <FieldGroup label="Trashed" name="trashed">
              <SelectInput
                name="trashed"
                value={trashed}
                onChange={e =>
                  setFilters({ trashed: e.target.value }).then(() =>
                    setOpened(false)
                  )
                }
                options={[
                  { value: '', label: '' },
                  { value: 'with', label: 'With Trashed' },
                  { value: 'only', label: 'Only Trashed' }
                ]}
              />
            </FieldGroup>
          </div>
        </div>
        <button
          onClick={() => setOpened(true)}
          className="px-4 border-r rounded-l md:px-6 hover:bg-gray-100 focus:outline-none focus:border-white focus:ring-2 focus:ring-indigo-400 focus:z-10"
        >
          <div className="flex items-center">
            <span className="hidden text-gray-700 md:inline">Filter</span>
            <ChevronDown size={14} strokeWidth={3} className="md:ml-2" />
          </div>
        </button>
        <TextInput
          name="search"
          placeholder="Search…"
          autoComplete="off"
          value={search}
          onChange={e =>
            setFilters(
              { search: e.target.value },
              {
                limitUrlUpdates:
                  e.target.value === '' ? undefined : debounce(250)
              }
            )
          }
          className="border-0 rounded-l-none focus:ring-2"
        />
      </div>
      <button
        onClick={() => setFilters(null)}
        className="ml-3 text-sm text-gray-600 hover:text-gray-700 focus:text-indigo-700 focus:outline-none"
        type="button"
      >
        Reset
      </button>
    </div>
  );
}
