'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import Fuse from 'fuse.js';

interface SearchIndexItem {
    id: string; // loc
    title: string;
    description: string;
    category: string; // Tips, Diet, Workout
    url: string;
}

export default function SearchBar() {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const [searchIndex, setSearchIndex] = React.useState<SearchIndexItem[]>([]);
    const [fuse, setFuse] = React.useState<Fuse<SearchIndexItem> | null>(null);
    const [results, setResults] = React.useState<SearchIndexItem[]>([]);

    const handleOpen = () => {
        setOpen(true);
        if (searchIndex.length === 0) {
            fetch('/search-index.json')
                .then((res) => res.json())
                .then((data: SearchIndexItem[]) => {
                    setSearchIndex(data);
                    const fuseInstance = new Fuse(data, {
                        keys: [
                            { name: 'title', weight: 2 },
                            { name: 'description', weight: 1 },
                            { name: 'category', weight: 0.5 },
                        ],
                        threshold: 0.3, // Lower threshold = stricter matching
                        includeScore: true,
                    });
                    setFuse(fuseInstance);
                })
                .catch((err) => console.error('Failed to load search index:', err));
        }
    };

    const handleClose = () => {
        setOpen(false);
        setQuery('');
        setResults([]);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);

        if (!val.trim() || !fuse) {
            setResults([]);
            return;
        }

        const fuseResults = fuse.search(val);
        // Take top 8 results
        setResults(fuseResults.slice(0, 8).map(result => result.item));
    };

    // Global shortcut (Ctrl+K or Cmd+K)
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                handleOpen();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [searchIndex.length]);

    return (
        <Box>
            <IconButton
                color="inherit"
                aria-label="search"
                onClick={handleOpen}
                sx={{ ml: 1 }}
            >
                <SearchIcon />
            </IconButton>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        mt: { xs: 2, sm: 8 }, // Higher up on desktop
                        position: 'absolute',
                        top: 0,
                        maxHeight: '80vh',
                    }
                }}
            >
                <DialogTitle sx={{ p: 2, pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SearchIcon color="action" />
                    <InputBase
                        autoFocus
                        fullWidth
                        placeholder="Search tips, diets, workouts..."
                        value={query}
                        onChange={handleSearch}
                        sx={{ ml: 1, flex: 1, fontSize: '1.1rem' }}
                    />
                    <IconButton onClick={handleClose} size="small" aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 0, '&:first-of-type': { paddingTop: 0 } }}>
                    {query && results.length === 0 && (
                        <Box sx={{ p: 4, textAlign: 'center' }}>
                            <Typography color="text.secondary">
                                No results found for &quot;{query}&quot;
                            </Typography>
                        </Box>
                    )}
                    
                    {results.length > 0 && (
                        <List sx={{ pt: 0 }}>
                            {results.map((item) => (
                                <ListItem key={item.id} disablePadding>
                                    <ListItemButton
                                        component={Link}
                                        href={item.url}
                                        onClick={handleClose}
                                        sx={{
                                            borderBottom: '1px solid',
                                            borderColor: 'divider',
                                            p: 2,
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5, flexWrap: 'wrap', gap: 1 }}>
                                                    <Typography variant="subtitle1" fontWeight="bold">
                                                        {item.title}
                                                    </Typography>
                                                    <Chip 
                                                        label={item.category} 
                                                        size="small" 
                                                        color={
                                                            item.category === 'Tips' ? 'primary' : 
                                                            item.category === 'Diet' ? 'success' : 'secondary'
                                                        }
                                                        variant="outlined" 
                                                        sx={{ fontSize: '0.7rem', height: 20 }} 
                                                    />
                                                </Box>
                                            }
                                            secondary={
                                                <Typography 
                                                    variant="body2" 
                                                    color="text.secondary"
                                                    sx={{ 
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    {item.description}
                                                </Typography>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    )}
                    
                    {!query && searchIndex.length > 0 && (
                        <Box sx={{ p: 3, textAlign: 'center', opacity: 0.6 }}>
                            <Typography variant="body2" gutterBottom>
                                Search through our {searchIndex.length} articles, diets, and workouts.
                            </Typography>
                            <Typography variant="caption" sx={{ display: { xs: 'none', sm: 'block' } }}>
                                Tip: You can also press <kbd style={{ padding: '2px 6px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '4px', fontSize: '0.9em' }}>Ctrl</kbd> + <kbd style={{ padding: '2px 6px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '4px', fontSize: '0.9em' }}>K</kbd> to open search.
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}
