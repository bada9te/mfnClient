import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import AccountRestorationForm from './account-restore'
import { getDictionary } from '@/dictionaries/dictionaries'
import { MockedProvider } from "@apollo/client/testing";
import { gql } from '@apollo/client';

jest.mock('next/headers', () => {
    return {
        cookies: () => ({
            get: () => {}
        })
    }
});

jest.mock('next/navigation', () => {
    return {
        useRouter: () => {}
    }
});

const mocks = [
    {
        request: {
            query: gql`
                query test {
                    test {
                        test
                    }
                }
            `,
            variables: {}
        },
        result: {}
    }
];
 
describe('Account Restoration Form', () => {
  it('exists (should have a role="form" attribute)', async() => {
    const dictionary = await getDictionary("en");
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <AccountRestorationForm userId={''} actionId={''} verifyToken={''} type={''} dictionary={dictionary.components}/>
        </MockedProvider>
    );
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });
})