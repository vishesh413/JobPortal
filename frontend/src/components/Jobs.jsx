import { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { X } from 'lucide-react'

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job)
  const [filterJobs, setFilterJobs] = useState(allJobs)
  const [showFilter, setShowFilter] = useState(false)

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        )
      })
      setFilterJobs(filteredJobs)
    } else {
      setFilterJobs(allJobs)
    }
  }, [allJobs, searchedQuery])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-8xl mx-auto mt-5 px-4 sm:px-5">
        {/* Mobile Filter Toggle Button */}
        <div className="md:hidden mb-4 flex justify-start">
        <Button
            variant="outline"
            className="flex items-center gap-2 text-gray-700 border-gray-300 bg-white shadow-sm"
            onClick={() => setShowFilter(true)}
        >
            {/* Filter Icon */}
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 6h14M7 12h10M7 18h6" />
            </svg>
            Filter
        </Button>
        </div>


        {/* Main Layout */}
        <div className="flex flex-col md:flex-row gap-5">

          {/* Filter Sidebar for md+ */}
          <div className="hidden md:block w-1/4">
            <FilterCard />
          </div>

          {/* Job Listings */}
          <div className="flex-1 h-[80vh] overflow-y-auto pb-5">
            {filterJobs.length <= 0 ? (
              <p className="text-center text-gray-600 text-sm">Job not found</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 bg-white z-50 p-4 overflow-y-auto md:hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Filter Jobs</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowFilter(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <FilterCard />
        </div>
      )}
    </div>
  )
}

export default Jobs