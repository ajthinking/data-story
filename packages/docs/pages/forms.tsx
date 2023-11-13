import { ParamV2 } from '@data-story/core';
import { DropDown, ExampleForm, FormV2 } from '@data-story/ui';
import '@data-story/ui/dist/data-story.css';

export default function Home() {
  // Somewhere, params is defined
  const params: ParamV2[] = [
    {
      name: 'kind_of_name',
      label: 'Kind of Name',
      type: 'Select',
      value: 'Firstname',
      help: 'A Select input',
      options: [
        { label: 'Firstname', value: 'Firstname' },
        { label: 'Lastname', value: 'Lastname' },
      ]
    },
    {
      name: 'name',
      label: 'Name',
      type: 'String_',
      value: 'John Doe',
      help: 'A String_ input',
    },
    {
      name: 'number_of_family_members',
      label: 'Number of Family Members',
      type: 'Number_',
      value: undefined,
      help: 'A Number_ input',
    },
    {
      name: 'welcome_message',
      label: 'Welcome Message',
      type: 'Interpretable',
      schemaFromPort: 'input',
      value: 'Hello {{name}}',
      help: 'An Interpretable Input',
    },
    {
      name: 'note',
      label: 'Note',
      type: 'DynamicInput',
      value: undefined,
      help: 'A DynamicInput',
      selectedType: 'String_',
      availableTypes: ['String_', 'Interpretable']
    },
    {
      name: 'skills',
      label: 'Skills',
      type: 'Repeatable',
      row: [
        {
          name: 'skill',
          label: 'Skill',
          type: 'String_',
          value: '',
          help: 'Describe the skill',
        },
        {
          name: 'level',
          label: 'Level',
          type: 'DynamicInput',
          selectedType: 'String_',
          availableTypes: ['String_', 'Interpretable'],
          value: '',
          help: 'How good are you at this skill?',
        },        
      ],
      help: 'A Repeatable input',
      value: []
    },
    {
      name: 'tasks',
      label: 'Tasks',
      type: 'Repeatable',
      row: [
        {
          name: 'task',
          label: 'Property',
          type: 'String_',
          value: '',
          help: 'Describe the task',
        },
        {
          name: 'level',
          label: 'Port',
          type: 'DynamicInput',
          selectedType: 'String_',
          availableTypes: ['String_', 'Interpretable'],
          value: '',
          help: 'How hard is the task?',
        },        
      ],
      help: 'A Repeatable input',
      value: []
    },    
  ]

  const closeAndLog = ({ close }) => {
    close();
    console.log('closeAndLog')
  }

  // Lets render them in a form
  return <div className="bg-blue-950 p-12 flex w-full flex-col">
    <div className="flex justify-center w-full py-12">
      <DropDown optionGroups={[
        {
          label: 'mode',
          options: [
            'interpretable',
            'map',
          ].map((name) => ({
            label: name,
            value: name,
            callback: closeAndLog
          }))
        },
        {
          label: 'type',
          options: [
            'string',
            'number',
            'date',
            'json',
            'js',
          ].map((name) => ({
            label: name,
            value: name,
            callback: closeAndLog
          }))
        },        
        {
          label: 'properties',
          options: [
            'id',
            'created_at',
            'updated_at',
            'properties',
            'properties.name',
            'properties.description',
            'properties.price',
            'properties.quantity',
            'properties.category',
          ].map((name) => ({
            label: name,
            value: name,
            callback: closeAndLog
          }))
        },
        {
          label: 'functions',
          options: [
            'trim',
            'lowercase',
            'uppercase',
            'replace',
            'split',
          ].map((name) => ({
            label: name,
            value: name,
            callback: closeAndLog
          }))
        }        
      ]}/>
    </div>
    <FormV2 params={params} />
    {/* <ExampleForm /> */}
  </div>
}