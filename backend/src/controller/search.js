const User = require('../models/user'); // Adjust the path as necessary
const Project = require('../models/projects'); // Adjust the path as necessary

/**
 * Get search suggestions for users and public projects.
 */
exports.getSearchSuggestions = async (req, res) => {
    const query = req.query.query || '';

    try {
        // Fetch users with names containing the query
        const users = await User.find({ name: new RegExp(query, 'i') }).limit(10);

        // Fetch public projects with titles containing the query
        const projects = await Project.find({ title: new RegExp(query, 'i'), visible: 'public' }).limit(10);

        const suggestions = [
            ...users.map(user => ({ id: user._id.toString(), name: user.name })),
            ...projects.map(project => ({ id: project._id.toString(), name: project.title }))
        ];

        res.status(200).json({ suggestions });
    } catch (error) {
        console.error('Error fetching search suggestions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
