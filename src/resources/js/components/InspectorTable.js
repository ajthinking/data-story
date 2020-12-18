import React from 'react';
import Diagram from './Diagram';
import { inject, observer } from "mobx-react"

@inject('store') @observer
export default class InspectorTable extends React.Component {

    features() {
        let id = this.props.store.metadata.activeInspector
        return this.props.store.diagram.engine.model.getNode(id).options.features
    }

    render() {
        return (
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        {this.renderTableHead()}
                        {this.renderTableBody()}
                    </table>
                    {this.features().length == 0 && 
                        <div className="flex w-full justify-center p-24 text-gray-300 font-mono text-xl">
                            No data to show here 😐
                        </div>
                    }
                  </div>
                </div>
              </div>
            </div>
        );
    }

    renderTableHead() {
        let headers = this.getHeaders()

        return (
            <thead>
            <tr>
                {this.getHeaders().map(heading => {
                    return (
                        <th key={heading} scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {heading}
                        </th>
                    )
                })}
            </tr>
          </thead>            
        )
    }

    renderTableBody() {
        return (
            <tbody>
                {this.getRows().map((row, rowIndex) => {
                    return (
                        <tr key={rowIndex} className="bg-white">
                            {row.map((column, columnIndex) => {
                                return (
                                    <td key={columnIndex} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                        {column}
                                    </td>                            
                                )
                            })}
                        </tr>
                    )
                })}

                
            </tbody>
        )
    }

    getHeaders() {
        let keys = this.features().map(i => Object.keys(i)).flat()
        return [...new Set(keys)];
    }

    getRows() {
        return this.features().map(user => {
            return Object.values(user)
        })
    }
}

