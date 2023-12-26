  {/* Importing the MUI Component so it will not be called every page  */}

  import Avatar from '@mui/material/Avatar';
  import Button from '@mui/material/Button';
  import CssBaseline from '@mui/material/CssBaseline';
  import TextField from '@mui/material/TextField';
  import FormControlLabel from '@mui/material/FormControlLabel';
  import FormControl from '@mui/material/FormControl';
  import Checkbox from '@mui/material/Checkbox';
  import Link from '@mui/material/Link';
  import Paper from '@mui/material/Paper';
  import Box from '@mui/material/Box';
  import Grid from '@mui/material/Grid';
  import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
  import Typography from '@mui/material/Typography';
  import InputLabel from '@mui/material/InputLabel';
  import useMediaQuery from '@mui/material/useMediaQuery';
  import InputAdornment from '@mui/material/InputAdornment';
  import VisibilityIcon from '@mui/icons-material/Visibility';
  import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
  import IconButton from '@mui/material/IconButton';
  import InfoIcon from '@mui/icons-material/Info';
  import MuiDrawer from '@mui/material/Drawer';
  import MuiAppBar from '@mui/material/AppBar';
  import Toolbar from '@mui/material/Toolbar';
  import List from '@mui/material/List';
  import Divider from '@mui/material/Divider';
  import Badge from '@mui/material/Badge';
  import Container from '@mui/material/Container';
  import MenuIcon from '@mui/icons-material/Menu';
  import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
  import NotificationsIcon from '@mui/icons-material/Notifications';
  import ListItemButton from '@mui/material/ListItemButton';
  import ListItemIcon from '@mui/material/ListItemIcon';
  import ListItemText from '@mui/material/ListItemText';
  import ListSubheader from '@mui/material/ListSubheader';
  import DashboardIcon from '@mui/icons-material/Dashboard';
  import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
  import PeopleIcon from '@mui/icons-material/People';
  import BarChartIcon from '@mui/icons-material/BarChart';
  import LayersIcon from '@mui/icons-material/Layers';
  import AssignmentIcon from '@mui/icons-material/Assignment';
  import CardMedia from '@mui/material/CardMedia';
  import SearchIcon from '@mui/icons-material/Search';
  import MailIcon from '@mui/icons-material/Mail';
  import LogoutIcon from '@mui/icons-material/ExitToApp';
  import SettingsIcon from '@mui/icons-material/Settings';
  import Menu from '@mui/material/Menu';
  import MenuItem from '@mui/material/MenuItem';
  import Brightness3Icon from '@mui/icons-material/Brightness3';
  import LightModeIcon from '@mui/icons-material/LightMode';
  import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
  import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
  import SchoolIcon from '@mui/icons-material/School';
  import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
  import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
  import PersonIcon from '@mui/icons-material/Person';
  import AccountCircleIcon from '@mui/icons-material/AccountCircle';
  import ListItem from '@mui/material/ListItem';
  import TableContainer from '@mui/material/TableContainer';
  import Table from '@mui/material/Table';
  import TableHead from '@mui/material/TableHead';
  import TableRow from '@mui/material/TableRow';
  import TableCell from '@mui/material/TableCell';
  import TableBody from '@mui/material/TableBody';
  import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
  import DialogTitle from '@mui/material/DialogTitle';
  import Dialog from '@mui/material/Dialog';
  import DialogContent from '@mui/material/DialogContent';
  import DialogActions from '@mui/material/DialogActions';
  import Select from '@mui/material/Select';
  import LocationCityIcon from '@mui/icons-material/LocationCity';
  import FilterListIcon from '@mui/icons-material/FilterList';
  import Tooltip from '@mui/material/Tooltip';
  import Card from '@mui/material/Card';
  import CardContent from '@mui/material/CardContent';
  import CardActions from '@mui/material/CardActions';
  import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
  import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
  import FoundationOutlinedIcon from '@mui/icons-material/FoundationOutlined';
  import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
  import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
  import TablePagination from '@mui/material/TablePagination';
  import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
  import StarRoundedIcon from '@mui/icons-material/StarRounded';
  import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
  import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
  import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  import ExpandLessIcon from '@mui/icons-material/ExpandLess';
  import Collapse from '@mui/material/Collapse';
  import Stack from '@mui/system/Stack';
  import Snackbar from '@mui/material/Snackbar';
  import MuiAlert from '@mui/material/Alert';
  import Slide from '@mui/material/Slide';
  import Fade from '@mui/material/Fade';
  import CircularProgress from '@mui/material/CircularProgress';
  import Backdrop from '@mui/material/Backdrop';
  import { createTheme, ThemeProvider, useTheme, styled } from '@mui/material/styles';


  {/* Exporting the MUI Component imported to be called globally  */}

  export {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    FormControl,
    Checkbox,
    Link,
    Paper,
    Box,
    Grid,
    LockOutlinedIcon,
    Typography,
    InputLabel,
    createTheme,
    ThemeProvider,
    useTheme,
    useMediaQuery,
    InputAdornment,
    VisibilityIcon,
    VisibilityOffIcon,
    IconButton,
    InfoIcon,
    MuiDrawer,
    MuiAppBar,
    Toolbar,
    List,
    Divider,
    Badge,
    Container,
    MenuIcon,
    ChevronLeftIcon,
    NotificationsIcon,
    styled,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    DashboardIcon,
    ShoppingCartIcon,
    PeopleIcon,
    BarChartIcon,
    LayersIcon,
    AssignmentIcon,
    CardMedia,
    SearchIcon,
    MailIcon,
    LogoutIcon,
    SettingsIcon,
    Menu,
    MenuItem,
    Brightness3Icon,
    LightModeIcon,
    AppRegistrationIcon,
    HelpOutlineIcon,
    SchoolIcon,
    FileDownloadOutlinedIcon,
    AddBoxOutlinedIcon,
    PersonIcon,
    AccountCircleIcon,
    ListItem,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    MoreHorizIcon,
    DialogTitle,
    Dialog,
    DialogContent,
    DialogActions,
    Select,
    LocationCityIcon,
    FilterListIcon,
    Tooltip,
    Card,
    CardContent,
    CardActions,
    SchoolOutlinedIcon,
    SettingsOutlinedIcon,
    FoundationOutlinedIcon,
    BorderColorOutlinedIcon,
    DeleteOutlineOutlinedIcon,
    TablePagination,
    StarOutlineRoundedIcon,
    StarRoundedIcon,
    InsertCommentOutlinedIcon,
    KeyboardBackspaceIcon,
    DescriptionOutlinedIcon,
    ExpandMoreIcon,
    ExpandLessIcon,
    Collapse,
    Stack,
    Snackbar,
    MuiAlert,
    Slide,
    Fade,
    CircularProgress,
    Backdrop,
  };