import {render, screen} from '@testing-library/react';

import { useCryptoCoins } from '@/services/api';
import { CRYPTO_MOCK_DATA } from '@/services/cryptos.mock';

import Home from '@/app/page';
import Table from '@/components/Table';
import RootContainer from '@/layouts/RootContainer';

import { CryptoField } from '@/services/cryptoField';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}))

const mockedUseUsersQuery = useCryptoCoins as jest.Mock<any>;

jest.mock("../services/api");

describe('Home Page', () => {

    beforeEach(() => {
        mockedUseUsersQuery.mockImplementation(() => ({ isLoading: true }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    
  it('should render the Title', () => {
    render(<RootContainer><Home/></RootContainer>)
    const title = screen.getByText('Crypto Search');
    expect(title).toBeInTheDocument();
  });

  it('should render the Search Bar with correct placeholder', () => {
    render(<RootContainer><Home/></RootContainer>)
    const searchBar = screen.getByPlaceholderText('Please input search text');
    expect(searchBar).toBeInTheDocument();
  });

  it('should display loading icon when loading', () => {
    render(<RootContainer><Home/></RootContainer>)
    const loadingIcon = screen.getByAltText("loading-icon");
    expect(loadingIcon).toBeInTheDocument();
  });

  it("Displays the users list", () => {
    render(<RootContainer><Table tableData={CRYPTO_MOCK_DATA as CryptoField[]} isLoading={false}/></RootContainer>)
    mockedUseUsersQuery.mockImplementation(() => ({
      status: 'success',
      data: {
        cryptoscoins: CRYPTO_MOCK_DATA
      }
    }));
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
  });
});

