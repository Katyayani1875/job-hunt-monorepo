import Job from '../models/job.js';

// Create Job
export const createJob = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'employer') {
      return res.status(403).json({ message: 'Only employers can post jobs.' });
    }

    const { title, description, location, employmentType, category, company } = req.body;
    if (!title || !description || !location || !employmentType || !category || !company) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    const job = await Job.create({
      ...req.body,
      postedBy: req.user.id,
    });

    res.status(201).json({ message: 'Job created successfully.', job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Update Job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found.' });

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to update this job.' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: 'Job updated successfully.', updatedJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Delete Job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found.' });

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this job.' });
    }

    await job.remove();
    res.status(200).json({ message: 'Job deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Get All Jobs
export const getJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      search
    } = req.query;

    const query = {};

    if (category) {
      query.category = new RegExp(`^${category}$`, 'i');
    }

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.max(1, parseInt(limit));

    const jobs = await Job.find(query)
      .populate('postedBy', 'name email')
      .populate('company', 'name')
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const total = await Job.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page: pageNum,
      limit: limitNum,
      jobs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Search Job Titles (for debounce and suggestions)
export const searchJobTitles = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: 'Query is required.' });

    const jobs = await Job.find({ title: new RegExp(query, 'i') })
      .limit(10)
      .select('title');

    const suggestions = [...new Set(jobs.map(job => job.title))];
    res.status(200).json({ success: true, suggestions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Get Job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name email')
      .populate('company', 'name');

    if (!job) return res.status(404).json({ message: 'Job not found.' });

    res.status(200).json({ success: true, job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Get Jobs by Company (postedBy ID)
export const getJobsByCompany = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.params.companyId })
      .sort({ createdAt: -1 })
      .populate('postedBy', 'name email')
      .populate('company', 'name');

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
