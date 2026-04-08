import { useState, useEffect } from "react";
import { SortDownIcon } from "@/public/icons/SortDownIcon";
import { SortUpIcon } from "@/public/icons/SortUpIcon";
import Spinner from "../loaders/spinner";
import styled from "styled-components";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter
} from "react-table";
import { SearchIcon } from "@/public/sidebaricons/SearchIcon";
import Pagination from "./Pagination";

const Styled = styled.div`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;
  margin-top: 20px;

  /* This will make the table scrollable when it gets too small */
  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    // border-bottom: 1px solid black;
  }

  table {
    /* Make sure the inner table is always as wide as needed */
    width: 100%;
    border-spacing: 0;
    text-align: left;

    thead { 
      tr{ 
        th {
          padding: 17px 0 24px 0 ;
          :last-child {
            border-right: 0;
            float: right;
          }
          }
        }
      }

    tbody { 
      tr{ 
        td {
          // text-align: center;
          // align-items: center;
          margin: 0;
          padding: 18px 0 18px 0 ;
          // border-bottom: 1px solid black;
          // border-right: 1px solid black;

          /* The secret sauce */
          /* Each cell should grow equally */
          // width: 1%;
          /* But "collapsed" cells should be as small as possible */
          &.collapse {
            width: 0.0000000001%;
          }

          :last-child {
            border-right: 0;
            float: right;
            
          }
        }
      }
    }
  } 
`

const GenericTable1 = (props) => {
  const { columns, data, handlerowclick, isrowclick, categoryOption } = props
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    return setTableData(data)
  }, [tableData])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: data,
      initialState: { pageIndex: 0 }
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  )
  const { globalFilter } = state;

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-[15px] items-center ">
          <p>Show</p>
          <select className={`w-15 mt-0 h-[34px] px-2 border rounded-lg outline-none bg-transparent`}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
            }}>
            {[10, 20, 30, 40].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <p>Entries</p>
        </div>

        <div className="flex items-center gap-[13px] " >
          {props.options ?
            <div className='flex flex-col'>
              <select onChange={props.onCategoryChange} value={categoryOption} name="category" className="w-48 h-10 px-3 border rounded-full outline-none bg-gray-50 text-black cursor-pointer" placeholder="Category">
                {props.options?.map((obj, index) => (
                  <option key={index} value={obj.value}> {obj.name} </option>
                ))}
              </select>
            </div> : null
          }
          <div>
            <div className="flex flex-row items-center gap-[10] w-[15.95px] h-[16px]"></div>
            <span className="absolute">
              <SearchIcon />
            </span>

            <input
              type="text"
              id="search"
              value={globalFilter || ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-[139px] h-[17px] flex items-center text-[14px] font-[400] font_futuralt bg-transparent outline-none"
              placeholder="Search (Keyword, etc)"
            />
          </div>
        </div>
      </div>

      <Styled>
        <div className="tableWrap pb-20">
          <table {...getTableProps()}>
            <thead  >
              {headerGroups.map((headerGroup, i) => (
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, i) => (
                    <th key={i} {...column.getHeaderProps(column.getSortByToggleProps(),
                      { className: column.collapse ? 'collapse' : '', }
                    )}>
                      <span className="flex items-center gap-[5px] text-[15px] font-[400] text-black">
                        {column.render("Header")}
                        <span>
                          {
                            column.isSorted ? (column.isSortedDesc ? <SortUpIcon /> : <SortDownIcon />)
                              : <span className="flex items-center">
                                <SortUpIcon /> <SortDownIcon />
                              </span>
                          }
                        </span>
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row)
                return (
                  <tr key={i} onClick={isrowclick && (() => handlerowclick(row.original?.transid))}
                    className={` ${i == 0 ? "" : props.border ? "border-t" : ""} text-sm `}
                    {...row.getRowProps()}  >
                    {row.cells.map((cell, i) => {
                      return <td key={i} {...cell.getCellProps({
                        className: cell.column.collapse ? 'collapse' : '',
                      })}>
                        {cell.render('Cell')}
                      </td>
                    })}
                  </tr>
                )
              })}
              <tr>
                {props.loading ? <div className="w-full flex justify-center items-center" ><Spinner variant="border-black" /></div> : null}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center" >
          <span className="flex text-sm" >
            <p> Showing &nbsp; </p>
            <p>{pageIndex + 1} to {pageSize + pageIndex} of {pageOptions.length}</p>
            <p> &nbsp; Entries </p>
          </span>
          <Pagination
            dataStates={{ tableData, setTableData }}
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            gotoPage={gotoPage}
            pageCount={pageCount}
            nextPage={nextPage}
            previousPage={previousPage}
            pageIndex={pageIndex}
          />
        </div>
      </Styled>
    </>
  );
};

export default GenericTable1;
