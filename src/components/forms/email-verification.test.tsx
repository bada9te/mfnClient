import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import EmailVerificationForm from './email-verification'
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
 
describe('Email Verification Form', () => {
  it('exists (should have a role="form" attribute)', async() => {
    const dictionary = await getDictionary("en");
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <EmailVerificationForm dictionary={dictionary.components}/>
        </MockedProvider>
    );
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });
})