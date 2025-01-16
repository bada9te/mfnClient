import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import PlaylistForm from './playlist'
import { getDictionary } from '@/app/translations/dictionaries'
import { MockedProvider } from "@apollo/client/testing";
import { gql } from '@apollo/client';
import ReduxProvider from '@/app/lib/redux/provider';

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
 
describe('Playlist Form', () => {
  it('exists (should have a role="form" attribute)', async() => {
    const dictionary = await getDictionary("en");
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <ReduxProvider>
                <PlaylistForm dictionary={dictionary.components}/>
            </ReduxProvider>
        </MockedProvider>
    );
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });
});