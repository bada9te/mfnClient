import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import AccountConfirminationForm from './account-confirmination'
import { getDictionary } from '@/app/dictionaries/dictionaries'
import { MockedProvider } from "@apollo/client/testing";
import { gql } from '@apollo/client';

jest.mock('next/headers', () => {
    return {
        cookies: () => ({
            get: () => {}
        })
    }
});

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

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
 
describe('Account Confirmination Form', () => {
  it('exists (should have a role="form" attribute)', async() => {
    const dictionary = await getDictionary("en");
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <AccountConfirminationForm userId='' actionId='' dictionary={dictionary.components}/>
        </MockedProvider>
    );
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });
})