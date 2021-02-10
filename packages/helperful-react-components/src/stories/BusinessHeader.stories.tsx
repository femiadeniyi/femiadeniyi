import React from 'react';
import { Story, Meta } from '@storybook/react';
import BusinessHeader, {BusinessHeaderProps} from "../components/business/BusinessHeader";
import "bootstrap/dist/css/bootstrap.min.css"

export default {
    title: 'Example/BusinessHeader',
    component: BusinessHeader,
} as Meta;

const Template: Story<BusinessHeaderProps> = (args) => <BusinessHeader {...args} />;

export const Default = Template.bind({});
