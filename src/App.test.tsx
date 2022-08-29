import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

const dummyAds = [
{
        jobtitle: 1,
        description: 1,
        applicationUrl: "todo 1",
        applicationDue: false,
},
{
        jobtitle: 1,
        description: 2,
        applicationUrl: "todo 2",
        applicationDue: false,
},
{
        jobtitle: 1,
        description: 3,
        applicationUrl: "todo 3",
        applicationDue: false,
},
];

test("ads list", async () => {
axios.get.mockResolvedValue({ data: dummyAds });
render(<App />);

const adList = await waitFor(() => screen.findAllByTestId("ad"));

expect(adList).toHaveLength(3);
});

