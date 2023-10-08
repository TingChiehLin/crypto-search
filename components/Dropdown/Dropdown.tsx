import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

interface DropdownBase<T, R> {
  handleClick: (value: T) => R;
}

type DropdownPropType = DropdownBase<string, void>;

const Dropdown: React.FC<DropdownPropType> = ({ handleClick }) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-4 py-2 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <span className='text-xs md:text-sm pt-[1px] md:pt-[0px]'>Sort By</span>
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>
  
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type='button'
                    className={classNames(
                      active ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-700',
                      'block w-full px-4 py-2 text-left  text-sm cursor-pointer'
                    )}
                    onClick={() => {
                      handleClick("Descending")
                    }}
                  >
                      Price (High to Low)
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type='button'
                    className={classNames(
                      active ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-700',
                      'block w-full px-4 py-2 text-left text-sm cursor-pointer'
                    )}
                    onClick={() => handleClick("Ascending")}
                  >
                    Price (Low to High)
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    )
}

export default Dropdown;