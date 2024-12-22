import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import SupportForm from '../../app/[lang]/support/components/forms/support'
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
 
describe('Support Form', () => {
  it('exists (should have a role="form" attribute)', async() => {
    const dictionary = await getDictionary("en");
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <SupportForm dictionary={dictionary.components}/>
        </MockedProvider>
    );
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });
})