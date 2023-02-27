export default function TablePaginationComponent({ currentPage, nextPage, paginate, previousPage, totalPages }) {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="p-8 flex justify-center">
            <ul className="inline-flex items-center -space-x-px">
                <li>
                    <a href="#" className="px-5 py-2 border rounded-l-full hover:bg-gray-200" onClick={() => paginate(1)}>⏮️</a>
                </li>
                <li>
                    <a href="#" className="px-4 py-2 border hover:bg-gray-200" onClick={previousPage}>⏪</a>
                </li>

                {
                    pageNumbers.map((pageNumber) => (
                        <li key={pageNumber} className={pageNumber === currentPage ? "px-4 py-2 bg-blue-200 text-blue-600 hover:bg-blue-300 hover:text-blue-700" : "px-4 py-2 border hover:bg-gray-200 hover:text-gray-600"}>
                            <a href="#" onClick={() => paginate(pageNumber)}>{pageNumber}</a>
                        </li>
                    ))
                }

                <li>
                    <a href="#" className="px-4 py-2 border hover:bg-gray-200" onClick={nextPage}>⏩</a>
                </li>
                <li>
                    <a href="#" className="px-5 py-2 border rounded-r-full hover:bg-gray-200" onClick={() => paginate(pageNumbers[pageNumbers.length - 1])}>⏭️</a>
                </li>
            </ul>
        </nav>
    );
}
