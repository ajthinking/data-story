import { useState } from 'react';
import { String_ } from './String_';
import { Map_ } from './Map_';
import { Interpretable } from './Interpretable';
import { DynamicField } from './DynamicField';

export function ExampleForm() {
  return (
    <div className='max-w-2xl w-full'>
      <div className='text-white font-bold text-xl px-1 mt-4'>Example Form</div>
      <div className='text-gray-100 text-xs px-1 py-2 border-b'>
        Things the forms, params and nodes need to handle
      </div>
      <div className='flex flex-col my-4 space-y-8'>
        <DynamicField
          label='Single type'
          types={['string']}
          help={'A simple fixed type input'}
          value={'localhost'}
        />
        <DynamicField
          label='Multiple types'
          types={['string', 'number']}
          help={'Allow user to select how input should be interpreted'}
          value='123'
        />
        <DynamicField
          label='JSON'
          types={['json']}
          value={'{ name: \'John\', email: \'\' }'}
          help={'User can enter JSON or HJSON.'}
        />        
        <DynamicField
          label='Interpretable input'
          types={['interpretable']}
          value={'Greetings ${name}. Your email is @lowercase(${email})'}
          help={'User can construct a value from incoming item properties and system functions. The UI supports lookup and insertion.'}
        />
        <DynamicField
          label='JS Eval'
          types={['js']}
          value={'item => item.price * 0.98'}
          help={'User can supply a JS snippet.'}
        />        
        <DynamicField
          label='Repeatable'
          types={['string']}
          help={'User can add multiple rows of input. Example use case: Node MapProperties specifies rows of [key - value]. The key is a string input, value is an [interpretable, string, map ...] input.'}
          value={'TODO'}
        />
        <DynamicField
          label='Port Selection'
          types={['string']}
          help={'User can select a target port. Example use case: Node Filter can allow a user to output items depending on a \'status\' property to ports ACTIVE, INACTIVE, UNKNOWN, etc. If this port does not exist it should be created.'}
          value={'TODO'}
        />
        <DynamicField
          label='Property Selection, single'
          types={['string']}
          help={'User can select a single property. Example use case: Node Merge needs requestor/supplier item property to perform the merge on.'}
          value={'TODO'}
        />
        <DynamicField
          label='Property Selection, multiple'
          types={['string']}
          help={'User can select many properties. Example use case: A DeleteProperties Node.'}
          value={'TODO'}
        />        
        <DynamicField
          label='Logic statements'
          types={['string']}
          help={'AND/OR type statments. Example use case: Node Filter - output to ACTIVE if status is \'active\' AND age is > 18.'}
          value={'TODO'}
        />
        <DynamicField
          label='Dependent fields'
          types={['string']}
          help={'Fields that should be filled if another field is filled.'}
          value={'TODO'}
        />        
      </div>
    </div>
  );
}